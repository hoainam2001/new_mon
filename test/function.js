const getConn = (req, res) => {
    const io = req.app.get('conn');
    return io;
};
module.exports = { getConn };
