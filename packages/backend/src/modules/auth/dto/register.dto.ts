import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
	@IsNotEmpty()
	@IsString()
	account!: string;

	@IsNotEmpty()
	@IsString({ message: "昵称必须是字符串" })
	name!: string;

	@IsNotEmpty()
	@IsString()
	password!: string;
}
