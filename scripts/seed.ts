const { PrismaClient } = require("@prisma/client");

const db = new PrismaClient();

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name:"Famous Peple"},
                {name:"Movies & TV"},
                {name:"Musicians"},
                {name:"Gmaes"},
                {name:"Animals"},
                {name:"Philosophy"},
                {name:"Scientists"},
            ]
        })
    } catch (error) {
        console.error("Error seeding default categoryies", error);
    } finally {
        await db.$disconnect();
    }
};

main();