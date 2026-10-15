const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @description register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {

    try {
        console.log("📝 Register Step 1: Request received", req.body)

        const { username, email, password } = req.body

        console.log("📝 Register Step 2: Extracted fields", { username, email, passwordLength: password?.length })

        if (!username || !email || !password) {
            console.log("❌ Register Step 3: Missing fields")
            return res.status(400).json({
                message: "Please provide username, email and password"
            })
        }

        console.log("✅ Register Step 3: All fields present")

        const isUserAlreadyExists = await userModel.findOne({
            $or: [ { username }, { email } ]
        })

        console.log("📝 Register Step 4: User check", { exists: !!isUserAlreadyExists })

        if (isUserAlreadyExists) {
            console.log("❌ Register Step 5: User already exists")
            return res.status(400).json({
                message: "Account already exists with this email address or username"
            })
        }

        console.log("✅ Register Step 5: User doesn't exist, proceeding")

        const hash = await bcrypt.hash(password, 10)
        console.log("✅ Register Step 6: Password hashed")

        const user = await userModel.create({
            username,
            email,
            password: hash
        })

        console.log("✅ Register Step 7: User created in DB", { userId: user._id })

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        console.log("✅ Register Step 8: JWT token created")

        res.cookie("token", token)
        console.log("✅ Register Step 9: Cookie set")

        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

        console.log("✅ Register Step 10: Response sent - SUCCESS")

    } catch (error) {
        console.error("❌ Register Error:", error.message)
        console.error("Stack:", error.stack)
        res.status(500).json({
            message: "Registration failed",
            error: error.message
        })
    }

}


/**
 * @name loginUserController
 * @description login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {

    try {
        console.log("🔐 Login Step 1: Request received", { email: req.body.email })

        const { email, password } = req.body

        console.log("🔐 Login Step 2: Extracted fields", { email, passwordLength: password?.length })

        const user = await userModel.findOne({ email })

        console.log("🔐 Login Step 3: User lookup", { found: !!user })

        if (!user) {
            console.log("❌ Login Step 4: User not found")
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        console.log("✅ Login Step 4: User found")

        const isPasswordValid = await bcrypt.compare(password, user.password)

        console.log("🔐 Login Step 5: Password check", { valid: isPasswordValid })

        if (!isPasswordValid) {
            console.log("❌ Login Step 6: Password invalid")
            return res.status(400).json({
                message: "Invalid email or password"
            })
        }

        console.log("✅ Login Step 6: Password valid")

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        )

        console.log("✅ Login Step 7: JWT token created")

        res.cookie("token", token)
        console.log("✅ Login Step 8: Cookie set")

        res.status(200).json({
            message: "User loggedIn successfully.",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })

        console.log("✅ Login Step 9: Response sent - SUCCESS")

    } catch (error) {
        console.error("❌ Login Error:", error.message)
        console.error("Stack:", error.stack)
        res.status(500).json({
            message: "Login failed",
            error: error.message
        })
    }
}


/**
 * @name logoutUserController
 * @description clear token from user cookie and add the token in blacklist
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlacklistModel.create({ token })
    }

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details.
 * @access private
 */
async function getMeController(req, res) {

    const user = await userModel.findById(req.user.id)



    res.status(200).json({
        message: "User details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}