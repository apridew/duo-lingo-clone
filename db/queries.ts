import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { challegeProgress, courses, lessons, units, userProgress } from "./schema";
import { eq } from "drizzle-orm";

export const getUserProgress = cache(async () => {
    const {userId} = await auth();

    if(!userId){
        return null
    }
    const data = await db.query.userProgress.findFirst({where: eq(userProgress.userId, userId),
        with: {
            activeCourse: true
        }
    })
return data
})

export const getUnits = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId){
        return []
    }

    const data = await db.query.units.findMany({
        where: eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                with:{
                    challenges: {
                        with:{
                            challegeProgress: {
                                where: eq(challegeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })

    const normalizedData = data.map((unit) =>{
        const lessonsWithCopmpletedStatus = unit.lessons.map((lesson) =>{
            const allCompletedChallenges = lesson.challenges.every((challenge) =>
            {
                return challenge.challegeProgress
                && challenge.challegeProgress.length > 0
                && challenge.challegeProgress.every((progress)=> progress.completed)
            })
            return {...lesson, completed: allCompletedChallenges}
        })
        return {...unit, lessons: lessonsWithCopmpletedStatus}
    })
    return normalizedData
})

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany()
    return data
})

export const getCourseById = cache(async (courseId: number) => {
    const data = await db.query.courses.findFirst({where: eq(courses.id, courseId),
    //TODO: Populate unit and lessons
    })
    return data
})

export const getCourseProgress = cache(async () => {
    const {userId} = await auth();
    const userProgress = await getUserProgress();

    if(!userId || !userProgress?.activeCourseId){
        return null
    }

    const unitsInActiveCourse = await db.query.units.findMany({
        orderBy:(units, {asc}) => [asc(units.order)],
        where: eq(units.courseId, userProgress.activeCourseId),
        with:{
            lessons:{
                orderBy:(lessons, {asc}) => [asc(lessons.order)],
                with:{
                    unit: true,
                    challenges:{
                        with:{
                            challegeProgress: {
                                where: eq(challegeProgress.userId, userId)
                            }
                        }
                    }
                }
            }
        }
    })
    const firstUncompletedLesson = unitsInActiveCourse
    .flatMap((unit) => unit.lessons)
    .find((lesson) =>{
        return lesson.challenges.some((challenge) =>{
            return !challenge.challegeProgress 
            || challenge.challegeProgress.length === 0 
            || challenge.challegeProgress.some((progress)=> progress.completed === false)
        })
    })

    return{
        activeLesson: firstUncompletedLesson,
        activeLessonId : firstUncompletedLesson?.id
    }
})

export const getLesson = cache(async (id?: number) => {
    const {userId} = await auth()

    if(!userId){
        return null
    }

    const courseProgress = await getCourseProgress()

    const lessonId = id || courseProgress?.activeLessonId

    if(!lessonId){
        return null
    }

    const data = await db.query.lessons.findFirst({
        where: eq(lessons.id, lessonId),
        with:{
            challenges: {
                orderBy:(challenges, {asc}) => [asc(challenges.order)],
                with:{
                    challengeOptions:  true,
                    challegeProgress:{
                        where: eq(challegeProgress.userId, userId)
                    }
                }
            }
        }
    })

    if(!data || !data.challenges){
        return null
    }

    const normalizedChallenges = data.challenges.map((challenge) =>{
        const completed = challenge.challegeProgress 
        && challenge.challegeProgress.length > 0
        && challenge.challegeProgress.every((progress)=> progress.completed)

        return {...challenge, completed}
    })
    return {...data, challenges: normalizedChallenges}
})