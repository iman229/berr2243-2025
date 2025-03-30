const { MongoClient } = require('mongodb');

const drivers = [
    {
        name: "John Doe",
        vehicleType: "Sedan",
        isAvailable: true,
        rating: 4.8
    },
    {
        name: "Alice Smith",
        vehicleType: "SUV",
        isAvailable: false,
        rating: 4.5
    }
];

// TODO: add additional drivers to the array
const newDrivers = [ 
    { name: "Makcikiyah MolaMola", vehicleType: "Hatchback", isAvailable: true, rating: 5.0 },
    { name: "Windah Basudara", vehicleType: "Sedan", isAvailable: false, rating: 3.6 },
    { name: "Gopal Muthu", vehicleType: "SUV", isAvailable: false, rating: 3.0 }
]; 

drivers.push(...newDrivers);

// Show all data in the console
console.log(drivers);

// TODO: show all drivers' names in the console
console.log("Drivers Name:");
drivers.forEach(driver => console.log(driver.name));

async function main() {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("testDB");
        const collection = db.collection("drivers");

        // Insert new drivers into MongoDB
        const insertResult = await collection.insertMany(newDrivers);
        console.log("New drivers inserted with IDs:", insertResult.insertedIds);

        // Display all drivers from MongoDB
        const allDrivers = await collection.find().toArray();
        console.log("Drivers in Database:");
        allDrivers.forEach(driver => console.log(driver.name));

        //Delete ALL unavailable drivers
        const deleteResult = await collection.deleteMany({ isAvailable: false });
        console.log(`Deleted ${deleteResult.deletedCount} unavailable drivers from the database.`);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();
