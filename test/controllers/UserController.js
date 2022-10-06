const { getConn } = require('../function');
const Binance = require('node-binance-api');

class UserController {
    index(req, res) {
        const io = getConn(req, res);
        const binance = new Binance().options({
            APIKEY: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
            APISECRET:
                'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
        });

        binance.futuresMiniTickerStream((data) => {
            io.sockets.emit('send-price', data);
        });

        binance.futuresMiniTickerStream('BTCUSDT', (data) => {
            io.sockets.emit('send-data-btc', data);
        });
        return res.render('index');
    }
}

module.exports = new UserController();
