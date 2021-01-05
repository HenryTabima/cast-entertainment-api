// Dependencies
import { hash } from 'bcryptjs';

// Entities
import { IUserEntity } from '@api/users/domain/entities/user';

// Shared
import { BaseCrudService } from '@api/shared/base-crud/application/base-crud-service';

// Repositories
import { IUserRepository } from '@api/users/domain/repositories/user';

// Dto's
import { UserDto } from './dto/user';

export class UserService extends BaseCrudService<IUserEntity, IUserEntity, IUserRepository> {
	protected schemaItem = UserDto;

	protected schemaItems = UserDto;

	private readonly saltOrRound = 10;

	constructor(repository: IUserRepository) {
		super(repository);
	}

	async create(data: IUserEntity): Promise<IUserEntity> {
		const { password } = data;
		const newPassword = await hash(password, this.saltOrRound);
		return super.create({ ...data, password: newPassword });
	}

	async update(id: number | string, data: IUserEntity): Promise<IUserEntity> {
		const { password } = data;
		const newData = { ...data };
		if (password) {
			newData.password = await hash(password, this.saltOrRound);
		}
		return super.update(+id, data);
	}
}
