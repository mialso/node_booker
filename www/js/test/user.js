var expect = chai.expect;
describe("init user module", function() {
    describe("real case", function() {
        before(function(done) {
            app.user.init(function(){
                done();});
        });
        it("should extract name from storage", function() {
                expect(app.user.name).to.be.a('string');
                expect(app.user.name).to.be.equal(localStorage.getItem("user"));
                expect(app.user.name).to.be.not.empty;
        });
        it("should create user role object", function() {
                expect(app.user.role).to.be.an('object');
                expect(app.user.name).to.be.not.empty;
        });
        it("should create user ui object", function() {
            expect(app.user.ui).to.be.an('object');
            expect(app.user.ui).to.be.not.empty;
        });
        it("should not allow second init", function(done) {
            app.user.init(function(err) {
                expect(err).to.exist;
                done();
            });
        });
    });
    describe("mocked case: wrong token in storage", function() {
        var temp;
        before(function(done) {
            temp = localStorage.hasOwnProperty("user") ? localStorage.getItem("user") : false;
            localStorage.setItem("user", "wrong_user");
            app.user.test_case = true;
            app.user.init(function(){
                done();});
        });
        after(function() {
            if (temp) {
                localStorage.setItem("user", temp);
            } else {
                localStorage.removeItem("user");
            }
            app.user.test_case = false;
        });
        it("should extract name from storage", function() {
            expect(app.user.name).to.be.a('string');
            expect(app.user.name).to.be.equal(localStorage.getItem("user"));
            expect(app.user.name).to.be.not.empty;
        });
        it("should not create user role object", function() {
            expect(app.user.role).to.be.undefined;
        });
        it("should not create user ui object", function() {
            expect(app.user.ui).to.be.undefined;
        });
    });
    describe("mocked case: wrong data received", function() {

    });
});
