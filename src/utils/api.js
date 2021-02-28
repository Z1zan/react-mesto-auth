class Api {
  constructor({baseUrl, token}) {
    this.baseUrl = baseUrl;
    this._token = token;
  }

  getInitialCards() {
    return fetch(`${this.baseUrl}/cards`, {
      headers: {
        authorization: this._token
      }
    })
    .then(response => response.ok 
      ? response.json() 
      : Promise.reject(`Ошибка загрузки карточек: ${response.status}`))
  }

  createCardOne(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(`Ошибка создания карточки: ${res.status}`)
  )
  }

  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token
      }
    })
    .then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(`Ошибка получения профиля: ${res.status}`)
  )
  }

  setUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
        avatar: data.avatar
      })
    })
    .then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(`Ошибка изменения профиля: ${res.status}`)
  )
  }

  setUserAvatar(link) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(`Ошибка изменения профиля: ${res.status}`)
    )
  }

  removeCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._token,
      }
    })
    .then((res) =>
    res.ok
      ? res.json()
      : Promise.reject(`Ошибка удаления картинки: ${res.status}`)
    )
  }

  changeLikeCardStatus(cardId, isLiked) {
    if(isLiked == false) {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: this._token,
          'Content-Type': 'application/json'
        }
      })
      .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Ошибка лайка карточки: ${res.status}`)
      )
    } else {
      return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: this._token,
        }
      })
      .then((res) =>
      res.ok
        ? res.json()
        : Promise.reject(`Ошибка дизлайка карточки: ${res.status}`)
      )
    }
  }
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-19",
  token: "264a260c-a5ff-4494-a8c2-9dd802b24892",
});

export default api;
