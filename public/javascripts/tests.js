var request = superagent;

describe('Our API', function(){
  describe('POST empty data to /questions', function(){
    it("returns a 400", function(done) {
      request.post("/questions").end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  describe('POST valid data to /questions', function(){
    it("returns the saved question in json", function(done) {
      request.post("/questions")
        .send({body: 'one test question', email: 'test@test.com'})
        .end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(200);
        expect(res.body.slug).to.equal('one-test-question');
        done();
      });
    });
  });
  describe('POST duplicate data to /questions', function(){
    it("returns a 400", function(done) {
      request.post("/questions")
        .send({body: 'one test question', email: 'test@test.com'})
        .end(function(err, res) {
        if (err) { throw err; }
        expect(res.status).to.equal(400);
        done();
      });
    });
  });
  // describe('GET /questions', function(){
  //   "/questions"
  // })
});