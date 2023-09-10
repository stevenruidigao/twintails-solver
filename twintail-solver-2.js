function solve() {
    const start = new Date();
    
    document.getElementById('bt_backe').children[0].click();
    document.getElementById('bt_start').children[0].click();
    
    inputs = {
        "left": false,
        "right": false
    }
    
    let id = null;
    const buffer = 0.1;
    const proportion = 0.75;
    const randomness = 0.25;
    // let randomValue = Math.random();
    let leftRandomValue = Math.random();
    let rightRandomValue = Math.random();
    
    randomId = setInterval(() => {
        // randomValue = Math.random();
        leftRandomValue = Math.random();
        rightRandomValue = Math.random();
    }, 500);
    
    timeId = setInterval(() => {
        console.log(`${(new Date() - start) / 1000} seconds elapsed`);
    }, 30000);
    
    id = setInterval(() => {
        if (parseInt(document.getElementsByClassName('time')[0].innerText) > 0) {
            // const randBuffer = buffer + randomValue * randomness;
            const leftRandBuffer = buffer + leftRandomValue * randomness;
            const rightRandBuffer = buffer + rightRandomValue * randomness;
            const leftBuffer = (window.frameLRotation - window.tailLRotation) * proportion / Math.PI * leftRandBuffer + leftRandBuffer;
            const rightBuffer = (window.frameRRotation - window.tailRRotation) * proportion / Math.PI * rightRandBuffer + rightRandBuffer;
                        
            if (window.frameLRotation + leftBuffer > window.tailLRotation && !inputs['left']) {
                inputs['left'] = true;
            
                e = new KeyboardEvent('keydown', {
                    bubbles: true, cancelable: true, keyCode: 37
                });
                
                document.body.dispatchEvent(e);
            }
            
            if (window.frameLRotation - leftBuffer <= window.tailLRotation && inputs['left']) {
                inputs['left'] = false;
            
                e = new KeyboardEvent('keyup', {
                    bubbles: true, cancelable: true, keyCode: 37
                });
                
                document.body.dispatchEvent(e);
            }
            
            if (window.frameRRotation - rightBuffer <= window.tailRRotation && !inputs['right']) {
                inputs['right'] = true;
            
                e = new KeyboardEvent('keydown', {
                    bubbles: true, cancelable: true, keyCode: 39
                });
                
                document.body.dispatchEvent(e);
            }
            
            if (window.frameRRotation + rightBuffer > window.tailRRotation && inputs['right']) {
                inputs['right'] = false;
            
                e = new KeyboardEvent('keyup', {
                    bubbles: true, cancelable: true, keyCode: 39
                });
                
                document.body.dispatchEvent(e);
            }

        } else if (id !== null) {
            clearInterval(randomId);
            clearInterval(timeId);
            clearInterval(id);
        }
    }, 1);
}

solve();
