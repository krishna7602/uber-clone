const Captain = require('../models/captain.model');

module.exports.createCaptain = async (data) => {
    const captain = new Captain({
        fullName: {
            firstName: data.firstName,
            lastName: data.lastName,
        },
        email: data.email,
        password: data.password,
        vehicle: {
            color: data.color,
            plate: data.plate,
            capacity: data.capacity,
            vehicleType: data.vehicleType,
        },
        socketId: data.socketId,
    });

    return await captain.save();
};
