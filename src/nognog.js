var Nognog = (function (window, document) {
    'use strict';
    var init = function() {
        includeAxios();
        includeFingerprint();
        includeJsrsasign();
    },
    includeAxios = function() {
        var js,
            fjs = document.getElementsByTagName('script')[0];
        if (!document.getElementById('axios-script')) {
            js = document.createElement('script');
            js.id = 'axios-script';
            js.setAttribute('defer', '');
            js.src = '//cdnjs.cloudflare.com/ajax/libs/axios/0.19.0/axios.min.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    includeJsrsasign = function() {
        var js,
            fjs = document.getElementsByTagName('script')[0];
        if (!document.getElementById('jsrsasign-script')) {
            js = document.createElement('script');
            js.id = 'jsrsasign-script';
            js.setAttribute('defer', '');
            js.src = '//kjur.github.io/jsrsasign/jsrsasign-all-min.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    includeFingerprint = function() {
        var js,
            fjs = document.getElementsByTagName('script')[0];
        if (!document.getElementById('fg-script')) {
            js = document.createElement('script');
            js.id = 'fg-script';
            js.setAttribute('defer', '');
            js.src = '//cdn.jsdelivr.net/npm/fingerprintjs2@2.1.0/dist/fingerprint2.min.js';
            fjs.parentNode.insertBefore(js, fjs);
        }
    },
    getFingerprint = async function() {
        return new Promise(((resolve, reject) => {
            if (!Fingerprint2) {
                console.error('Could not found fingerprintjs2');
                reject(null);
            }
            var components = Fingerprint2.get(function(components) {
                if (components && components.length) {
                    var values = components.map(function (component) { return component.value });
                    var murmur = Fingerprint2.x64hash128(values.join(''), 31);
                    resolve(murmur);
                } else {
                    reject(null);
                }
            });
        }));
    },
    getUserJWTToken = function() {
        if (!KJUR) {
            console.error('Could not found KJUR jsrsasign');
            return null;
        }
        var header = {alg: 'RS256', typ: 'JWT'},
            payload = {
                iss: this.config.vendorId,
                admin: false,
                exp: KJUR.jws.IntDate.get('now + 1day')
            };
        var sHeader = JSON.stringify(header),
            sPayload = JSON.stringify(payload);
        return KJUR.jws.JWS.sign('RS256', sHeader, sPayload, this.config.userPKI.priv);
    },
    getAdminJWTToken = function() {
        if (!KJUR) {
            console.error('Could not found KJUR jsrsasign');
            return null;
        }
        var header = {alg: 'RS256', typ: 'JWT'},
            payload = {
                iss: this.config.vendorId,
                admin: false,
                exp: KJUR.jws.IntDate.get('now + 1day')
            };
        var sHeader = JSON.stringify(header),
            sPayload = JSON.stringify(payload);
        return KJUR.jws.JWS.sign('RS256', sHeader, sPayload, this.config.adminPKI.priv);
    },
    podConnect = async function(email) {
        if (!axios) {
            console.error('Could not found axios');
            return null;
        }

        var userToken = this.getUserJWTToken(),
            fingerprint = await getFingerprint();
        
        var response = await axios.post(this.config.podUrl + '/pods/connect', {
            signatures: { fingerprint, email }
        }, {
            headers: { Authorization: `Bearer ${userToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        if (response.status === 200 && response.data && response.data.vendorAccessToken) {
            return response.data.vendorAccessToken;
        }
        
        return null;
    },
    /*
    activityData = {
        "scope":"sites.history",
        "action": {
            "actionPredicate":"article1",
            "actionObject":"front_676"
            
        },
        "timestamp":1569983632000
    }
    */
    postPodActivity = async function(accessToken, activityData) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var response = await axios.post(this.config.podUrl + '/pods/activities', activityData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        return response && response.status === 200;
    },
    /*
    recommendData = {
        "recommendationType":"similar",
        "searchQuery":"certification and standards development",
        "currentViewItemId":"article_190790",
        "contentViewerGrp":"exco",
        "top-k": 10,
        "requestContentType": ["article","event"]
    }
    */
    postRecommendations = async function(accessToken, recommendData) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var response = await axios.post(this.config.podUrl + '/recommendations', recommendData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        return response && response.status === 200;
    },
    /*
    feedbackData = {
        "scope":"user.feedback",
        "action": {
            "actionPredicate":"why",
            "actionObject":"front_676"
            
        },
        "timestamp":1569983632000
    }
    */
    postRecommendFeedback = async function(accessToken, feedbackData) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var response = await axios.post(this.config.podUrl + '/pods/activities', feedbackData, {
            headers: { Authorization: `Bearer ${accessToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        return response && response.status === 200;
    },
    /*
    content = {
		"itemId":"123",
		"contentUserAccessGroup":"exco",
		"webSlug":"lorem-ipsum",
		"tags":"some tags",
		"status":"ACTIVATED",
		"publishedDate":"2019/07/19",
		"deletedAt":"timestamp",
		"createdAt":"timestamp",
		"updatedAt":"timestamp",
		"excerpt": "Lorem ipsum dolor sit amet",
		"imageUri":"https://www.scsglobalservices.com/files/buy_clean_banner2.jpg",
		"title":"Lorem ipsum",
		"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
    */
    uploadIncrementalContent = async function(content) {
        if (!axios) {
            console.error('Could not found axios');
            return false;
        }

        var adminToken = this.getAdminJWTToken();
        var response = await axios.post(this.config.vendorUrl + '/vendors/batches', content, {
            headers: { Authorization: `Bearer ${adminToken}` }
        }).catch(function(error) {
            console.log(error);
        });

        console.log(response);

        return response && response.status === 200;
    };
    init();
    return {
        config: {
            podUrl: 'https://scs-pods.noggin.space',
            vendorUrl: 'https://scs-vendors.noggin.space',
            vendorId: '950238B8D24D',
            adminPKI: {
                pub: `
                -----BEGIN PUBLIC KEY-----
                MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPp9jQNI/Po7PLD+TbyvNPYp65
                LMwunr1VwKB4AEQer5vqpl9DsuJyNgED0srEtw45IuCZ5migspWiuXMDUL50tZm1
                ExV0Q+eKAlwNMmLESoDUQ2Jsrl23REiV0VHUw5hhrsu7WEMrUYbdMCI7WcV2zuGG
                U2907rQjQvP9/3NjgwIDAQAB
                -----END PUBLIC KEY-----
                `,
                priv: `
                -----BEGIN RSA PRIVATE KEY-----
                MIICXQIBAAKBgQDPp9jQNI/Po7PLD+TbyvNPYp65LMwunr1VwKB4AEQer5vqpl9D
                suJyNgED0srEtw45IuCZ5migspWiuXMDUL50tZm1ExV0Q+eKAlwNMmLESoDUQ2Js
                rl23REiV0VHUw5hhrsu7WEMrUYbdMCI7WcV2zuGGU2907rQjQvP9/3NjgwIDAQAB
                AoGAKzwKI0deTeAKlhPIFY8K25Nv8qQGGwrH5uvFPVbo1+6+KrvbB9Bd32OpEG+5
                8f0fA/xkAQb878Be8VNlQ+Jy1J+toN/W3l+VzMmZxetqFjYjNV1fexNv+rQCjaDc
                EZUy01LDEs7lDCatBJK6OZuKgPK1vlnojmNWyXeHRlO/IYECQQD1OGRceyFBKo7D
                z9wGQGTHeZdC47ohGbP+OJ22nz00zjj4iIJgC6GNAZGTeDr8o9Bf4qunY19N//Zf
                I1ePgABDAkEA2Mi30USGLvSojhq7WNLs5Ne0w53tRtWK8ByCMxfbqCXC64mkb4+t
                uEQrcNwgMAbeTRlwId7wWchA9W/YATF7wQJBANN+Fnj4rT6yAL17KW2u3fx4ru++
                zso7i9SnacaW4kgH0HTx71f80BF4F+ETYfSBKHd6XMeaWhlAuHFnXt5h7FcCQHGj
                zpBZ/olQ4acUpk8qytovpWfCOucd/CZgm3QTNqePm/2C+vssc2GcArW3/vuOLix2
                gEyRJKe8DSlcRvxhJ0ECQQCjhuJGRzVnBeIfXnY/vJFWt7NzSyrHazoqxkpi6/SA
                DMzx5CwYtpfomVBKyyYHe+PFySUtnW+ug31QEcevbvPj
                -----END RSA PRIVATE KEY-----
                `
            },
            userPKI: {
                pub: `
                -----BEGIN PUBLIC KEY-----
                MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDPp9jQNI/Po7PLD+TbyvNPYp65
                LMwunr1VwKB4AEQer5vqpl9DsuJyNgED0srEtw45IuCZ5migspWiuXMDUL50tZm1
                ExV0Q+eKAlwNMmLESoDUQ2Jsrl23REiV0VHUw5hhrsu7WEMrUYbdMCI7WcV2zuGG
                U2907rQjQvP9/3NjgwIDAQAB
                -----END PUBLIC KEY-----
                `,
                priv: `
                -----BEGIN RSA PRIVATE KEY-----
                MIICXQIBAAKBgQDPp9jQNI/Po7PLD+TbyvNPYp65LMwunr1VwKB4AEQer5vqpl9D
                suJyNgED0srEtw45IuCZ5migspWiuXMDUL50tZm1ExV0Q+eKAlwNMmLESoDUQ2Js
                rl23REiV0VHUw5hhrsu7WEMrUYbdMCI7WcV2zuGGU2907rQjQvP9/3NjgwIDAQAB
                AoGAKzwKI0deTeAKlhPIFY8K25Nv8qQGGwrH5uvFPVbo1+6+KrvbB9Bd32OpEG+5
                8f0fA/xkAQb878Be8VNlQ+Jy1J+toN/W3l+VzMmZxetqFjYjNV1fexNv+rQCjaDc
                EZUy01LDEs7lDCatBJK6OZuKgPK1vlnojmNWyXeHRlO/IYECQQD1OGRceyFBKo7D
                z9wGQGTHeZdC47ohGbP+OJ22nz00zjj4iIJgC6GNAZGTeDr8o9Bf4qunY19N//Zf
                I1ePgABDAkEA2Mi30USGLvSojhq7WNLs5Ne0w53tRtWK8ByCMxfbqCXC64mkb4+t
                uEQrcNwgMAbeTRlwId7wWchA9W/YATF7wQJBANN+Fnj4rT6yAL17KW2u3fx4ru++
                zso7i9SnacaW4kgH0HTx71f80BF4F+ETYfSBKHd6XMeaWhlAuHFnXt5h7FcCQHGj
                zpBZ/olQ4acUpk8qytovpWfCOucd/CZgm3QTNqePm/2C+vssc2GcArW3/vuOLix2
                gEyRJKe8DSlcRvxhJ0ECQQCjhuJGRzVnBeIfXnY/vJFWt7NzSyrHazoqxkpi6/SA
                DMzx5CwYtpfomVBKyyYHe+PFySUtnW+ug31QEcevbvPj
                -----END RSA PRIVATE KEY-----
                `
            }
        },
        podConnect,
        getUserJWTToken,
        getAdminJWTToken,
        postPodActivity,
        postRecommendations,
        postRecommendFeedback,
        uploadIncrementalContent,
    };
})(window, document);