import { Either, right, left } from '@/shared/error-handler/either';
import { isValidEmail, isValidName, isValidPassword, isValidBio } from '@/shared/validators';
import { UserBuildDTO } from '@/domain/user/dtos';
import { buildUserContracts } from './contracts';
import { InvalidBioError, InvalidEmailError, InvalidNameError, InvalidPasswordError } from '../errors';

import { generationUUID } from '@/shared/utils/generationUUID';

type ObjectsBuildType = {
  [key: string]: Either<Error, string>;
};
export class User {
  public isValidEmail(email: string): Either<InvalidEmailError, string> {
    const isValid = isValidEmail(email);
    return isValid ? right(email) : left(new InvalidEmailError(email));
  }

  public isValidName(name: string): Either<InvalidNameError, string> {
    const isValid = isValidName(name);
    return isValid ? right(name) : left(new InvalidNameError(name));
  }

  public isValidPassword(password: string): Either<InvalidPasswordError, string> {
    const isValid = isValidPassword(password);
    return isValid ? right(password) : left(new InvalidPasswordError(password));
  }

  public isValidBio(bio: string): Either<InvalidBioError, string> {
    const isValid = isValidBio(bio);
    return isValid ? right(bio) : left(new InvalidBioError(bio));
  }

  public build(data: UserBuildDTO): buildUserContracts {
    const Objects: ObjectsBuildType = {
      name: this.isValidName(data.name),
      email: this.isValidEmail(data.email),
      password: this.isValidPassword(data.password),
      bio: this.isValidBio(data.bio),
    };

    if (Objects.name.isLeft()) {
      return left(Objects.name.value);
    }

    if (Objects.email.isLeft()) {
      return left(Objects.email.value);
    }

    if (Objects.password.isLeft()) {
      return left(Objects.password.value);
    }

    if (Objects.bio.isLeft()) {
      return left(Objects.bio.value);
    }
    return right({
      id: generationUUID({ isDomain: true }),
      name: Objects.name.value,
      email: Objects.email.value,
      password: Objects.password.value,
      bio: Objects.bio.value,
      website: data.website,
      location: data.location,
      date_of_birth: data.dateOfBirth,
      created_at: new Date(),
    });
  }
}
