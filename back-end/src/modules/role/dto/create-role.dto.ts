import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty } from "class-validator";
import { UserRoleEnum } from "src/modules/user/entities/user-role.enum";
import { User } from "src/modules/user/entities/user.entity";

export class CreateRoleDto {
    @ApiProperty({ description: 'The role name', enum: UserRoleEnum, default: UserRoleEnum.USER })
    @IsNotEmpty()
    @IsEnum(UserRoleEnum)
    roleName: UserRoleEnum;
  }