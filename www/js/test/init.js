var expect = chai.expect;

describe("load", function() {
    describe("app", function() {
        it("should be loaded", function() {
            expect(app).to.be.an('object');
        });
    });
    describe("user space modules", function() {
        var modules = ["node", "reserve"];
        modules.forEach(test);
        function test(elem) {
            return describe(elem, function() {
                it("should be loaded", function() {
                    expect(app[elem]).to.be.an('object');
                });
                it("should have 'glob' object", function() {
                    expect(app[elem].glob).to.be.an('object');
                });
                it("should have 'init' method", function() {
                    expect(app[elem].init).to.be.a('function');
                });
            });
        }
    });
    describe("kernel modules", function() {
        describe("net", function() {
            it("should be loaded", function() {
                expect(app.net).to.be.an('object');
            });
        });
        describe("sync", function() {
            it("should be loaded", function() {
                expect(app.sync).to.be.an('object');
            });
        });
        describe("ui", function() {
            it("should be loaded", function() {
                expect(app.ui).to.be.an('object');
            });
        });
    });
    describe("user module", function() {
                var elem = "user";
                it("should be loaded", function() {
                    expect(app[elem]).to.be.an('object');
                });
                it("should have 'glob' object", function() {
                    expect(app[elem].glob).to.be.an('object');
                });
                it("should have 'init' method", function() {
                    expect(app[elem].init).to.be.a('function');
                });

    });
});
