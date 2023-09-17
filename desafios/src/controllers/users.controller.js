export const GETALLUser = async (req, res) => {
    try{
        const users = await UserServices.GETALLUser(req,query);
        res.send({ results: users });
    } catch(e) {

    }
}

export const GETUserById = async (req, res) => {
    try{
        const user = await UserServices.GetOneUserById(req.params.id);
        res.send({ user })
    } catch (e) {

    }
    
}

export const POSTUser = async (req, res) => {
    try{
        const { name, lastname, email, age, password, cartId, role } = req.body;
        const createUser = await UserServices.CreateUser(req.body);
        res.send({results: createUser });
    } catch(e) {

    }
}