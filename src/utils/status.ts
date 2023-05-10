export const getTransactionStatus = (code: string) => {
    return code === "00"
        ? "approved"
        : code === "09"
            ? "pending"
            : code === "F9"
                ? "abandoned"
                : "declined";
};

export const getSettlementStatus = (code: string) => {
    return code === "00"
        ? "successful"
        : code === "09"
            ? "pending"
            : "error";
};
