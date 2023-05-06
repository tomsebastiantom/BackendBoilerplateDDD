import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { Visibility } from './visibility';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { InstructionType } from './instructionType';

interface InstructionProps {
  instructionType: InstructionType;
  instructionDescription: string;
  instructionCreationDate: Date;
  visibility: Visibility;
}

export class Instruction extends ValueObject<InstructionProps> {
  get instructionType(): InstructionType {
    return this.props.instructionType;
  }
  get instructionDescription(): string {
    return this.props.instructionDescription;
  }
  get instructionCreationDate(): Date {
    return this.props.instructionCreationDate;
  }
  get visibility(): Visibility {
    return this.props.visibility;
  }

  public constructor(props: InstructionProps) {
    super(props);
  }
  public static create(props: InstructionProps): Result<Instruction> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.instructionType, argumentName: 'instructionType' },
      {
        argument: props.instructionDescription,
        argumentName: 'instructionDescription'
      }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Instruction>(nullGuard.getErrorValue());
    } else {
      const instruction = new Instruction({ ...props });

      return Result.ok<Instruction>(new Instruction(props));
    }
  }
}
