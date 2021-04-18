export const MockActivatedRoute = () => jasmine.createSpyObj('ActivatedRouteMock', ['get'], {
  snapshot: {
    queryParams: {},
    routeConfig: { path: '/' }
  },
});

export const locationMock = jasmine.createSpyObj('LocationMock', ['go', 'onUrlChange', 'path']);
