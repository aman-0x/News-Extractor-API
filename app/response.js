module.exports = (res, HttpCode, Message) => {
    return res.status(HttpCode).json(Message)
}