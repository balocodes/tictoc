import { TictacPage } from './app.po';

describe('tictac App', function() {
  let page: TictacPage;

  beforeEach(() => {
    page = new TictacPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
