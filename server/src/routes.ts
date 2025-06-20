export const USERS_TO_ACCOUNT = new Map<string, string[]>();
const USERS_TO_PASSWORD = new Map<string, string>();
const USERS_TO_PARENT = new Map<string, string>();

const USERS : Array<string> = [];

// Registers new user
export const registerUser = (req: any, res: any) : void => { 
    if(req.body.user === undefined) {
        res.status(400).send(`Cannot register blank User ID`);
    } else if(USERS_TO_ACCOUNT.has(req.body.user)) {
        console.log("Taken!")
        res.status(400).send(`User ID ${req.body.user} is already taken!`);
    } else if (req.body.password === undefined) { 
        res.status(400).send(`Needs a password!`);
    } else {
        USERS_TO_ACCOUNT.set(req.body.user, []);
        USERS_TO_PASSWORD.set(req.body.user, req.body.password);
        USERS.push(req.body.user);
        res.status(200).send(`User ID ${req.body.user} successfully registered!`);
    }
}

// Adds account to user
export const loginUser = (req: any, res: any) : void => { 
    console.log("Welcome to login!")
    if(req.body.password === undefined || req.body.user === undefined) {
        res.status(403).send(`Malformed request`);
    } else if(!USERS_TO_ACCOUNT.has(req.body.user)) {
        res.status(400).send(`User ID ${req.body.user} is not real!`);
    } else if(USERS_TO_PASSWORD.get(req.body.user) === req.body.password) {
        res.status(200).send(`Account successfully logged in!`);
    } else {
        res.status(400).send(`User ID ${req.body.user} incorrect password I am 808 Crashout 67 67`);
    }
}

// Adds account to user
export const addToUser = (req: any, res: any) : void => { 
    if(req.body.account === undefined || req.body.user === undefined) {
        res.status(403).send(`Malformed request`);
    } else if(!USERS_TO_ACCOUNT.has(req.body.user)) {
        res.status(400).send(`User ID ${req.body.user} is not real!`);
    } else {
        if(req.body.account === undefined || req.body.account.user === undefined || req.body.account.password === undefined) {
            res.status(400).send(`Cannot register blank User ID`);
        } else if(USERS_TO_ACCOUNT.has(req.body.account.user)) {
            console.log("Taken!")
            res.status(400).send(`User ID ${req.body.account.user} is already taken!`);
        } else if (req.body.account.password === undefined) { 
            res.status(400).send(`Needs a password!`);
        } else {
            USERS_TO_ACCOUNT.set(req.body.account.user, []);
            USERS_TO_PASSWORD.set(req.body.account.user, req.body.account.password);
            USERS_TO_PARENT.set(req.body.user, req.body.account.user);
            USERS.push(req.body.account.user);

            let list = USERS_TO_ACCOUNT.get(req.body.user)?.slice();
            if(list === undefined) {
                list = [];
            }
        
            list.push(req.body.account.user);
            USERS_TO_ACCOUNT.set(req.body.user, list);
            console.log(JSON.stringify(list));
            USERS.push(req.body.account)
            res.status(200).send(`User ID ${req.body.account.user} added to ${req.body.user}!`);
        }
    }
}

// Gets user info (name of immediate child accounts)
export const getUserInfo = (req: any, res: any) : void => { 
    if(req.query.user === undefined) {
        res.status(400).send(`Cannot get info on blank User ID`);
    } else if(USERS_TO_ACCOUNT.has(req.query.user)) {
        res.status(200).send({user: req.query.user, accounts: USERS_TO_ACCOUNT.get(req.query.user), 
                                                    parent: USERS_TO_PARENT.get(req.query.user)});
    } else {
        res.status(400).send(`Not a valid user!`);
    }
}

// Gets user info (name of all child accounts [even grandchildren])
export const getDeepUserInfo = (req: any, res: any) : void => { 
    if(req.query.user === undefined) {
        res.status(400).send(`Cannot get info on blank User ID`);
    } else if(USERS_TO_ACCOUNT.has(req.query.user)) {
        res.status(200).send({user: req.query.user, accounts: traverseAccountsHelper(req.query.user),
                                                    parent: USERS_TO_PARENT.get(req.query.user)
        });
    } else {
        res.status(400).send(`Not a valid user!`);
    }
}

// helper to traverse accounts
const traverseAccountsHelper = (username: string) : Array<string> => {
    const names = USERS_TO_ACCOUNT.get(username); // names to add and also search recursively
    if(names === undefined) {
        return [username]; // account w/ no names -- return list containing name 
    }

    let namesGathered = names;
    for(const name of names) { 
        const listSoFar = traverseAccountsHelper(name); // list of names seen so far
        namesGathered = namesGathered.concat(listSoFar);
    }
    return namesGathered;

}