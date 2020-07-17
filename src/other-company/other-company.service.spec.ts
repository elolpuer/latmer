import { Test, TestingModule } from '@nestjs/testing';
import { OtherCompanyService } from './other-company.service';

describe('OtherCompanyService', () => {
  let service: OtherCompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OtherCompanyService],
    }).compile();

    service = module.get<OtherCompanyService>(OtherCompanyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
