export const getErrors = (validation, numberExpected) => {
    expect(validation).toBeDefined();
    const errors = validation.errors;
    expect(Object.keys(errors)).toHaveLength(numberExpected);
    return errors;
};

export const checkCode = statusCode => res => {
    expect(res.body.error).toBeUndefined();
    expect(res.status).toEqual(statusCode);
};
