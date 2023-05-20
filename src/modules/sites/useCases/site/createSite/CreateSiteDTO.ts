

export interface CreateSiteDTO {

    siteName: string;
    address: AddressDTO;
    companyName: string;
    contacts?: ContactDTO[];
    contact?: ContactDTO;
    isActive: boolean;
    instruction?: InstructionDTO;
    instructions?: InstructionDTO[];
    tenantId?: string;
  }


  export interface ContactDTO {
    contactName: string;
    contactPhone?: string;
    contactEmail: string;
    contactRole: string;
  }
  export interface InstructionDTO {
    instructionType: string;
    instructionDescription: string;
    instructionCreationTimestamp: Number;

  }

  export interface AddressDTO {
    city: string;
    state: string;
    country?: string;
    postalCode: string;
  }
 
 
  

