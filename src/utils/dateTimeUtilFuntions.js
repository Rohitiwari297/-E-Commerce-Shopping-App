// export const generateTimeSlots = () => {
//     const slots = [];
//     let startHour = 9;   // start time 9 AM
//     let endHour = 21;    // end time 9 PM

//     for (let hour = startHour; hour < endHour; hour++) {
//         slots.push(`${formatTime(hour, 0)} - ${formatTime(hour, 30)}`);
//         slots.push(`${formatTime(hour, 30)} - ${formatTime(hour + 1, 0)}`);
//     }

//     return slots;
// };

// const formatTime = (hour, minute) => {
//     const ampm = hour >= 12 ? "PM" : "AM";
//     const h = hour % 12 || 12;
//     const m = minute === 0 ? "00" : minute;
//     return `${h}:${m} ${ampm}`;
// };

// export const getValidSlots = (selectedDate) => {
//     const allSlots = generateTimeSlots();
//     const now = new Date();

//     return allSlots.filter((slot) => {
//         const [start] = slot.split(" - ");
//         const [time, modifier] = start.split(" ");
//         let [hours, minutes] = time.split(":");

//         hours = parseInt(hours);
//         minutes = parseInt(minutes);

//         if (modifier === "PM" && hours !== 12) hours += 12;
//         if (modifier === "AM" && hours === 12) hours = 0;

//         const slotTime = new Date(selectedDate);
//         slotTime.setHours(hours, minutes, 0);

//         // If selected date is today → remove past slots
//         if (
//             selectedDate.toDateString() === now.toDateString()
//         ) {
//             return slotTime > now;
//         }

//         return true; // future dates ke liye sab show karo
//     });
// };



// TIMING AS PER 24H
export const generateTimeSlots24H = () => {
    const slots = [];

    for (let hour = 0; hour < 24; hour++) {
        slots.push(
            `${format24(hour, 0)} - ${format24(hour, 30)}`
        );

        if (hour !== 23) {
            slots.push(
                `${format24(hour, 30)} - ${format24(hour + 1, 0)}`
            );
        }
    }

    return slots;
};

const format24 = (hour, minute) => {
    const h = hour.toString().padStart(2, "0");
    const m = minute.toString().padStart(2, "0");
    return `${h}:${m}`;
};


export const getValidSlots = (selectedDate) => {
    const allSlots = generateTimeSlots24H();
    const now = new Date();

    return allSlots.filter((slot) => {
        const [start] = slot.split(" - ");
        const [hours, minutes] = start.split(":");

        const slotTime = new Date(selectedDate);
        slotTime.setHours(parseInt(hours), parseInt(minutes), 0);

        if (selectedDate.toDateString() === now.toDateString()) {
            return slotTime > now;
        }

        return true;
    });
};