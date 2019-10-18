const Resource = require('rest-resource').default
const Client = require('rest-resource/dist/client').DefaultClient

const BaseResource = Resource.extend({
    client: new Client('https://jsonplaceholder.typicode.com')
})

const UserResource = BaseResource.extend({
    endpoint: '/users'
})

const TodoResource = BaseResource.extend({
    endpoint: '/todos',
    related: {
        userId: UserResource
    }
})

TodoResource.list()
    .then((response) => {
        response.resources.forEach(async (resource) => {
            let title = await resource.getAsync('title')
            let author = await resource.getAsync('userId.name')
            let doneText = await resource.getAsync('completed') ? 'checked="checked"' : ''
            todosEl.innerHTML += `<td><input type="checkbox" ${doneText}></td><td>${title}</td><td>${author}</td>`
        })
    })
    