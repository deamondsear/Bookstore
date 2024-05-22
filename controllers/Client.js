class Client {
  async signup(req, res) {
    res.status(200).send('Регистрация пользователя');
  }

  async login(req, res) {
    res.status(200).send('Вход в личный кабинет');
  }

  async check(req, res) {
    res.status(200).send('Проверка авторизации');
  }

  async getAll(req, res) {
    res.status(200).send('Список всех пользователей');
  }

  async getOne(req, res) {
    res.status(200).send('Получение одного пользователя');
  }

  async update(req, res) {
    res.status(200).send('Обновление пользователя');
  }
}

export default new Client();
