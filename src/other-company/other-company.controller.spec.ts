import { Test, TestingModule } from '@nestjs/testing';
import { OtherCompanyController } from './other-company.controller';

describe('OtherCompany Controller', () => {
  let controller: OtherCompanyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OtherCompanyController],
    }).compile();

    controller = module.get<OtherCompanyController>(OtherCompanyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
