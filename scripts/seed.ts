import "dotenv/config"
import {drizzle} from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema"

const sql = neon(process.env.DATABASE_URL!);

const db = drizzle(sql, {schema})

const main = async() => {
    try {
        console.log("Seeding database")

        await db.delete(schema.courses)
        await db.delete(schema.userProgress)
        await db.delete(schema.units)
        await db.delete(schema.lessons)
        await db.delete(schema.challenges)
        await db.delete(schema.challengeOptions)
        await db.delete(schema.challegeProgress)

        await db.insert(schema.courses).values([
            {
                id: 1,
                title: "English",
                imageSrc: "US.svg"
            },
            {
                id: 2,
                title: "Deutsch",
                imageSrc: "DE.svg"
            },
            {
                id: 3,
                title: "French",
                imageSrc: "FR.svg"
            },
            {
                id: 4,
                title: "Bahasa",
                imageSrc: "ID.svg"
            },
            {
                id: 5,
                title: "Japanese",
                imageSrc: "JP.svg"
            },
        ])

        await db.insert(schema.units).values([
            {
                id: 1,
                courseId: 1,
                title: "Unit 1",
                description: "Learn the basic of English",
                order: 1,
            },
        ])

        await db.insert(schema.lessons).values([
            {
                id:1,
                unitId:1,
                order: 1,
                title: "Nouns"
            },
            {
                id:2,
                unitId:1,
                order: 2,
                title: "Verbs"
            },
            {
                id:3,
                unitId:1,
                order: 3,
                title: "Vocabulary & Phrases"
            },
            {
                id:4,
                unitId:1,
                order: 4,
                title: "Tenses"
            },
            {
                id:5,
                unitId:1,
                order: 5,
                title: "Speaks"
            },
        ])

        await db.insert(schema.challenges).values([
            {
                id:1,
                lessonId:1,
                order: 1,
                type: "SELECT",
                question: 'Which one of these is the "Man"?',
            },
        ])
        
        await db.insert(schema.challengeOptions).values([
            {
                id: 1,
                challengeId: 1,
                imageSrc: "/man.svg",
                correct: true,
                text: "Hello this is my voice",
                audioSrc: "/man.mp3",
            },
            {
                id: 2,
                challengeId: 1,
                imageSrc: "/woman.svg",
                correct: false,
                text: "Hello this is my voice",
                audioSrc: "/woman.mp3",
            },
            {
                id: 3,
                challengeId: 1,
                imageSrc: "/robot.svg",
                correct: false,
                text: "Hello this is my voice",
                audioSrc: "/robot.mp3",
            },
        ])

        console.log("Seeding finished")

    } catch (error) {
        console.error(error)
        throw new Error("Failed to seed database")
    }
}

main()