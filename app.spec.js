describe("aircraft", function(){
  browser.get('/#');

    it("should display the correct title", function(){
      expect(browser.getTitle()).toBe('Aircraft Dashboard');
    });

    it("should display the correct title", function(){
      expect(browser.element(by.css('div')).getText()).toBe('FE App');
    });

});
