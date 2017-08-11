import { SpaSrcPage } from './app.po';

describe('spa-src App', () => {
  let page: SpaSrcPage;

  beforeEach(() => {
    page = new SpaSrcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
