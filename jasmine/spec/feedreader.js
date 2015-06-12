/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('for all feeds it should have a url and the url is not empty', function () {
            // loop trough all feeds
            allFeeds.forEach(function (feed) {
                // check if url is empty string
                expect(feed.url).not.toBe('');
                // check if url is undefined
                expect(feed.url).not.toBeUndefined();
            });
         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
          it('for all feeds it should have a name and the name is not empty', function () {
            // loop trough all feeds
            allFeeds.forEach(function (feed) {
                // check if url is empty string
                expect(feed.name).not.toBe('');
                // check if url is undefined
                expect(feed.url).toBeDefined();
            });
         });
    });

    /* TODO: Write a new test suite named "The menu" */

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

    describe('The menu', function () {        
        it('should be hidden by default', function () {
            expect($('body.menu-hidden').length).toEqual(1);
        });

        /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again
        */
        
        it('should be be visible when the icon is clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });



    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
    describe('Initial entries', function () {
        beforeEach(function (done) {
            // sent feed id + callback
           loadFeed(0, done);
        });

        it('should have at least a single entry element', function (done) {
            expect($('.entry').length).toBeGreaterThan(0);  
            // signal to framework which test rely upon async
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function () {
        var html1, html2;
        beforeEach(function (done) {
            // empty all feeds           
            $('.feed').empty();
            // load first feed
            loadFeed(0, function () {
                // store first entry
                html1 = $('.entry:first h2').text();         
            });
            
            // load second feed
            loadFeed(1, function () {
                // store second entry
                html2 = $('.entry:first h2').text();
                done();
            });
        });

        it('should load new content', function (done) {
            // compare entries
            expect(html1).not.toEqual(html2);
            done();
        });
    });

    // Custom test if handleBars is abvailable
    describe('Handlebars', function () {
        it('should be defined', function () {
            expect( Handlebars.compile ).toBeDefined();  
        });
    });

    // Custom test if google is abvailable
    describe('Google', function () {
        it('should be defined', function () {
            expect( google.load ).toBeDefined();  
        });
    });
}());
