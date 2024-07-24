import userModel from "../models/models.js"
import JWT from 'jsonwebtoken'
import bcrypt from 'bcrypt'


// sign Up GET method
const signUp = (req, res) => {
    res.render('signup')
}

// sign In GET method
const signIn = (req, res) => {
    res.render('signin')
}

// sign In POST method
const postSignIn = async (req, res) => {
    const { username, password } = req.body;

    const user = await userModel.findOne({ username }).select('+password');
    try {
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = JWT.sign({ _id: user._id }, process.env.SECRET, {
                expiresIn: '24h'
            });

            res.cookie('token', token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true
            });

        }

        return res.render('user', {
            username: user.username,
            country: user.country,
            age:user.age,
            email: user.email,
            name: user.name
        });

    } catch (error) {
        return res.render('signin', {
            message: 'Login failed'
        });
    }
}

// sign Up POST method
const postSignUp = async (req, res) => {

    const { name, username,age, email, password, country } = req.body;
    const hashedPsasword = await bcrypt.hash(password, 10)

    try {
        const userInfo = await userModel.create({
            name,
            username,
            email,
            age,
            password: hashedPsasword,
            country
        })
        userInfo.save()
        res.redirect('/signin')
    } catch (error) {
        if (error.code === 11000) {
            return res.render('signup', {
                message: 'User already exits!'
            })
        }
        return res.render('signup', {
            message: 'Something went wrong!'
        })
    }

}

// dashboard GET method
const dashboard = async (req, res) => {
    const token = req.cookies.token;
    const payload = JWT.verify(token, process.env.SECRET)
    const user = await userModel.findById(payload._id)

    return res.render('user', {
        username: user.username,
        country: user.country,
        email: user.email,
        age:user.age,
        name: user.name
    })
}

// Logout GET method
const logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/signin')
}

export { signIn, signUp, postSignIn, postSignUp, dashboard, logout }
