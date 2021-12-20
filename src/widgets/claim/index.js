const styles = `
    #lancero-claim-widget {
        tab-size: 4;
        -webkit-text-size-adjust: 100%;
        font-family: "Inter", sans-serif;
        line-height: inherit;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        border: 0 solid;
        --tw-ring-inset: var(--tw-empty,/*!*/ /*!*/);
        --tw-ring-offset-width: 0px;
        --tw-ring-offset-color: #fff;
        --tw-ring-color: rgba(26,86,219,0.5);
        --tw-ring-offset-shadow: 0 0 #0000;
        --tw-ring-shadow: 0 0 #0000;
        border-radius: .125rem;
        border-width: 1px;
        border-color: rgba(229,231,235,1);
        background-color: rgba(255,255,255,1);
        padding: 3rem;
        box-shadow: var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),0 1px 2px 0 rgba(0,0,0,0.05);
        width: 100%;
    }

    #lancero-claim-widget #lancero-title {
        tab-size: 4;
        -webkit-text-size-adjust: 100%;
        font-family: inherit;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        border: 0 solid;
        border-color: rgba(229,231,235,1);
        margin: 0;
        font-size: 1.5rem;
        line-height: 2rem;
        font-weight: 700;
    }

    #lancero-claim-widget .lancero-label {
        tab-size: 4;
        -webkit-text-size-adjust: 100%;
        font-family: inherit;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        border: 0 solid;
        border-color: rgba(229,231,235,1);
        font-size: .75rem;
        line-height: 1rem;
        font-weight: 300;
    }

    #lancero-claim-widget .lancero-input {
        tab-size: 4;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        border: 0 solid;
        font-family: inherit;
        margin: 0;
        color: inherit;
        appearance: none;
        background-color: #fff;
        border-width: 1px;
        padding: .5rem .75rem;
        display: block;
        width: 100%;
        border-radius: .125rem;
        border-color: rgba(209,213,219,1);
        transition-property: background-color,border-color,color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;
        transition-timing-function: cubic-bezier(.4,0,.2,1);
        transition-duration: .15s;
        font-size: .875rem;
        line-height: 1.25rem;
    }

    #lancero-claim-widget #lancero-feedback {
        tab-size: 4;
        -webkit-text-size-adjust: 100%;
        font-family: inherit;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        border: 0 solid;
        border-color: rgba(229,231,235,1);
        margin: 0;
        margin-top: .25rem;
        font-size: .75rem;
        line-height: 1rem;
        height: auto;
    }

    #lancero-claim-widget .error {
        color: rgba(239,68,68,1);
    }

    #lancero-claim-widget .success {
        color: rgba(34,197,94,1);
    }

    #lancero-claim-widget #lancero-button {
        tab-size: 4;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
        box-sizing: border-box;
        border: 0 solid;
        border-color: rgba(229,231,235,1);
        font-family: inherit;
        font-size: 100%;
        margin: 0;
        text-transform: none;
        background-image: none;
        cursor: pointer;
        padding: 0;
        line-height: inherit;
        -webkit-appearance: button;
        margin-top: 1.25rem;
        width: 100%;
        background-color: rgba(0,0,0,1);
        padding-top: .5rem;
        padding-bottom: .5rem;
        font-weight: 500;
        color: rgba(255,255,255,1);
    }

`;

const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const widget = document.getElementById('lancero-claim-widget');

widget.innerHTML = `
<h1 id="lancero-title">Claim your code</h1>
<label id="lancero-email-label" class="lancero-label" for="email">Email</label>
<input id="lancero-email-input" class="lancero-input" name="email" type="email" placeholder="Your email" autocomplete="off"/>
<label id="lancero-code-label" class="lancero-label"  for="code">Email</label>
<input id="lancero-code-input" class="lancero-input" name="code" type="text" placeholder="Your code" autocomplete="off"/>
<p id="lancero-feedback" style="visibility: hidden;"></p>
<button id="lancero-button">Claim code</button>
`;

const me = document.querySelector('script[lancero-pk]');
const pk = me.getAttribute('lancero-pk');

const emailInput = document.getElementById('lancero-email-input');
const codeInput = document.getElementById('lancero-code-input');
const submit = document.getElementById('lancero-button');
const feedback = document.getElementById('lancero-feedback');

submit.addEventListener('click', async e => {
  feedback.style.visibility = 'hidden';

  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailInput.value.match(regexEmail)) {
    const res = await fetch('https://api.lancero.app/codes/claim', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInput.value,
        code: codeInput.value,
      }),
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${pk.pk_lancero}`},
    });
    if (res.status === 200) {
      feedback.innerHTML = 'Claimed your code!';
      feedback.classList.add('success');
      feedback.classList.remove('error');
      feedback.style.visibility = 'visible';
    } else {
      feedback.innerHTML = res.statusText;
      feedback.classList.add('error');
      feedback.classList.remove('success');
      feedback.style.visibility = 'visible';
    }
  } else {
    feedback.innerHTML = 'Please enter a valid email';
    feedback.classList.add('error');
    feedback.classList.remove('success');
    feedback.style.visibility = 'visible';
  }
});
