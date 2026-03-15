import { PartialType } from '@nestjs/mapped-types';
import { CreateScanHeaderDto } from './create-scan-header.dto';

export class UpdateScanHeaderDto extends PartialType(CreateScanHeaderDto) {}
