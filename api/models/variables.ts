const dateOptions = {
    timestamps: {
        createdAt: "dateCreated",
        updatedAt: "dateUpdated"
    }
};

const emailRegex = /[a-z0-9!#$%&"*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&"*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export {
    dateOptions,
    emailRegex
}