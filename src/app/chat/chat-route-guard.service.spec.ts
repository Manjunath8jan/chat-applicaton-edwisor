import { TestBed } from '@angular/core/testing';

import { ChatRouteGuardService } from './chat-route-guard.service';

describe('ChatRouteGuardService', () => {
  let service: ChatRouteGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatRouteGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
