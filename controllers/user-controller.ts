import { Request, Response } from "express";
import user, { UserDocument } from "../models/user";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../helpers/environment";
import bcrypt from "bcrypt";

export const profile = async (req: Request, res: Response) => {
    try {
        const _user = await user.findById(req.userTokenVerified.id);

        res.status(200).json({
            error: 0,
            message: "user profile loaded",
            user: _user,
        });
    } catch (e: any) {
        res.status(500).json({
            error: 1,
            message: e.message,
        });
    }
};

export const add = async (req: Request, res: Response) => {
    try {
        const { fullname, username, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const _user = await user.create({
            [UserDocument.fullname]: fullname,
            [UserDocument.username]: username,
            [UserDocument.password]: hashedPassword,
        });

        res.status(201).json({
            error: 0,
            message: "register successfull",
            user: _user,
        });
    } catch (e: any) {
        res.status(500).json({
            error: 1,
            message: e.message,
        });
    }
};

export const generateToken = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const _user = await user.findOne({ [UserDocument.username]: username });

        if (_user !== null && (await bcrypt.compare(password, _user.password!!))) {
            const token = jwt.sign(
                {
                    id: _user._id,
                    isRefreshToken: false,
                },
                TOKEN_SECRET,
                { expiresIn: "15m" }
            );

            const refreshToken = jwt.sign(
                {
                    id: _user._id,
                    isRefreshToken: true,
                },
                TOKEN_SECRET,
                { expiresIn: "7d" }
            );

            res.status(201).json({
                error: 0,
                message: "generate token successfull",
                token,
                refreshToken,
            });
        } else
            res.status(401).json({
                error: 1,
                message: "given credentials invalid",
            });
    } catch (e: any) {
        res.status(500).json({
            error: 1,
            message: e.message,
        });
    }
};

export const generateRefreshToken = async (req: Request, res: Response) => {
    try {
        const _user = await user.findById(req.userTokenVerified.id);

        const token = jwt.sign(
            {
                id: _user!!._id,
                isRefreshToken: false,
            },
            TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        const refreshToken = jwt.sign(
            {
                id: _user!!._id,
                isRefreshToken: true,
            },
            TOKEN_SECRET,
            { expiresIn: "7d" }
        );

        res.status(200).json({
            error: 0,
            message: "generate new token successfull",
            token,
            refreshToken,
        });
    } catch (e: any) {
        res.status(500).json({
            error: 1,
            message: e.message,
        });
    }
};
