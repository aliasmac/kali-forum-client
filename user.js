class User {

    constructor(userData) {
        this.id = userData.id
        this.name = userData.name
        this.location = userData.location
    }

    static findById(id) {
        return KaliController.users.find(user => user.id === parseInt(id))
      }  

}