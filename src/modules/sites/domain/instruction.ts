import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { Visibility } from './visibility';
import { ValueObject } from '../../../shared/domain/ValueObject';
import { InstructionType } from './instructionType';

interface InstructionProps {
  instructionType: string;
  instructionDescription: string;
  instructionCreationTimestamp: number;
  // visibility: Visibility;
}

export class Instruction extends ValueObject<InstructionProps> {
  get instructionType(): string {
    return this.props.instructionType;
  }
  get instructionDescription(): string {
    return this.props.instructionDescription;
  }
  get instructionCreationTimestamp(): number {
    return this.props.instructionCreationTimestamp;
  }
  // get visibility(): Visibility {
  //   return this.props.visibility;
  // }

  public constructor(props: InstructionProps) {
    super(props);
  }
  public static toPersistence(instruction: Instruction): any {
    return {
      instructionType: instruction.instructionType,
      instructionDescription: instruction.instructionDescription,
      instructionCreationTimestamp: instruction.instructionCreationTimestamp
    };
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
