const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do Perfil do Usuario"/>
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😭'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😭'}</p>
                                            <p>${user.followers ?? 'Não possui seguidores'}</p>
                                            <p>${user.following ?? 'Não está seguindo ninguem'}</p>
                                        </div>
                                    </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank"><h4>${repo.name}</h4>
                                                                    <i class="event-list">🍴 ${repo.forks_count}</i>
                                                                    <i class="event-list">⭐ ${repo.stargazers_count}</i>
                                                                    <i class="event-list">👀 ${repo.watchers_count}</i>
                                                                    <i class="event-list">🧑‍💻 ${repo.language ?? 'Sem linguagem'}</i>
                                                                </a></li>`)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = '';
        user.events.forEach(element => {
            if (element.type === 'PushEvent') {
                    eventsItens += `<li>
                                        <h3>${element.repo.name}</h3>
                                        <p> -- ${element.payload.commits[0].message}</p>
                                    </li>`
            } else {
                    eventsItens += `<li>
                                        <h3>${element.repo.name}</h3>
                                        <p> -- Sem mensagem de Commit</p>
                                    </li>`
            };
        });
        if (user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }