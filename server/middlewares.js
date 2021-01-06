const localsMiddleware  = (req, res, next) => {
    res.locals.user = req.user || null;
    console.log(req.user)
    next();
    // res.locals 클라이언트로 변수들을 보낼 수 있다.
}

const accessPrivate = (req, res, next) => {
    if(!req.user){
        return res.status(400).redirect("/");
    }
    next();
}

const accessPublic = (req, res, next) => {
    if(req.user){
        return res.status(400).redirect("/");
    }
    next();
}

export { localsMiddleware, accessPrivate , accessPublic }

//https://ko.javascript.info/import-export#ref-4122