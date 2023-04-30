import { Entity } from '../../../shared/domain/Entity';
import { Result } from '../../../shared/core/Result';
import { Guard } from '../../../shared/core/Guard';

import { SiteId } from './siteId';
import { Visibility } from './visibility';

interface InstructionProps {
  instructionType: string;
  instructionDescription: string;
  instructionCreationDate: Date;
  siteId: SiteId;
  visibility: Visibility;
}

export class Instruction extends Entity<InstructionProps> {
  public constructor(props: InstructionProps) {
    super(props);
  }
  public create(props: InstructionProps): Result<Instruction> {
    const nullGuard = Guard.againstNullOrUndefinedBulk([
      { argument: props.instructionType, argumentName: 'instructionType' }
    ]);

    if (nullGuard.isFailure) {
      return Result.fail<Instruction>(nullGuard.getErrorValue());
    } else {
      const instruction = new Instruction({ ...props });

      return Result.ok<Instruction>(new Instruction(props));
    }
  }
}
