export const getTransactionStatus = (code: string) => {
    return code === "00"
        ? "Approved"
        : code === "09"
            ? "Pending"
            : code === "F9"
                ? "Abandoned"
                : "Declined";
};

export const getSettlementStatus = (code: string) => {
    return code === "00"
        ? "successful"
        : code === "09"
            ? "pending"
            : "error";
};
