import * as functions from "firebase-functions";
import * as admin from "firebase-admin";


const certificate = {
  "projectId": "lered2web",
  // eslint-disable-next-line max-len
  "privateKey": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC0AxF0N5Q99jKG\nQdHcyZLCiGy0i50goWuVWRrBZb0R/R1LarnjjQAqeo84hZSxYnm9B1/IV9ATReIl\njGMQoNSkOjhePH18bH2XRwtR9r8SSwH0U+aDBzgbsBQXWTuT4QtTNyZh5DwQvAcw\nMX8TDBMCcQXGhWIwpiYfiTEG/uWGxoMamK3O+Cn0Eqvf9wbqe3evxzunR8YcEdPW\nstbrHc0K7s2OcCQ77sfo3y8Nrkv4uy1s7QngKDr0NLO4eJLYAhZsqboQvT7C9orr\nk3sSorskQaRRELbFQdNMLnf4f6bff7qN2atLt4Muni9mIlkhZak2/jd/gk/Yfyhq\nWO1EzGvhAgMBAAECggEACTIK7ZviBId6FAxysv7QP2qGp9mZIJyX77YjvSaV61ns\n6cUjuWSiuIjJ0Vvv7F7/OjfEap1WiyJLwU1HL9QRAlHZchiDwU8tdZ4/psoEmRbT\naVUldlYJ3xtpVO2a/7ZERNXElF8uh+npZOQ/MIx/Jn9gvL/9jXlygxpLMqdJhE8a\nELxXUJTa0dpc72CCTeQL8XThAwDL/DmyvBjZLGjCDvolZWBcfkzhzlUTwkdwGMdR\niatE90sROp4ssIV7juE0NXGv3BjHQYWycHXIXDN0NDPeWJEVBEHaODSBz2IC80js\nzzV6zuMciHjebKuG0vMzN0LcI80LtnS4J1XcnlysjQKBgQDstX/GMeXkYfJQPeer\n6YgoA1Pink6g/T60+1tmabJIm/AF0/9cOeB4NKnFOiCU4omVfTRRk5jcaHJmlKtw\nK/kLZG1W8xnIEQs1DQ8K1xxaawXOwF4We/snHb/ZN9rDjdiI4kPqkyiGJSYSLMFW\n5tr2gSHF3wFj9JGl/YNuGi7uuwKBgQDCrrCRWR/GpAlbdECQbKL4oTVEB9dBVeAX\nsyLLHao3TCfv+MPtaVnWo3StF1Hja/GkVyrG8BuGq340tWYUtjlJp+jIxhRhTot+\nQ1DhzeJC9TW0lueilb0pZrP109nqg894YLNYPMcw4jXW6KHgh+z6P9GxPmlQj308\n/OYUG/jcEwKBgQCPjIIwb5I7LisE/oXAe59WpK36gIaumuWsW8LSGMdFwUuOPUJf\na7n1K/rI4LdhkwBc59ESp6/L+otmKkLNg91ES2MDl+nKqothYMn+iPVo3/5lo8Nr\nX0SwNBpkYLsKXLs0SANn/lZVA7JS01FsohOn6ifRF6yAMZEiWNubqcVMgQKBgEYh\n2jeyLJFJnJlWir+8cwUwRdkJHhFKV10SSlFzkVM0WxrGugY3soZxAeItCXHs+/Lg\n9+cMrk3YT7G7O1fwwTh4hZJ2UPcw7W2B4IxHt9+5KCyzRCS83pUgi2nedJ1X+JB7\n/X+m/XbttsmBqncRYFxSSz8XpabA2jPzQwsxfHgDAoGBANTh39Lbmz5V2i3tLqoq\nLsWOVa0naj+pkKFyZf9Lz/Mi1Yv4KxMTxzq1Lk3+N1JrEbV9sJVKIWSWjn+lF8gV\nTWyRW1cTBB3dyXNG/xChdSkh1ccy6pUEN60O1g24NOGMmD4NGbs0enWUKuPHTS5w\n2XJ0GuoaK3PL5DSh2XLdVJcQ\n-----END PRIVATE KEY-----\n",
  "clientEmail": "firebase-adminsdk-p8i5e@lered2web.iam.gserviceaccount.com",
};

admin.initializeApp({
  // Insert certificate before deploying
  credential: admin.credential.cert(certificate),
});

export const removeUser = functions.firestore.document("/users/{uid}")
    .onDelete((snapshot, context) => {
      const authId = snapshot.data().authId;
      return admin.auth().deleteUser(authId);
    });


