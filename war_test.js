var expect = chai.expect;

describe('MyFunction', function() {
    describe('#isRoundWinner', function(){
        it('should let us know if game is over', function() {
            var x = isRoundWinner(5, 4);
            expect(x).to.equal(5, 4);
        });
    
    });
});
// having a hard time testing the more complex functions? Will try to go to office hours this week. 