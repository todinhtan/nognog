### Quickstart
Configuration
```js
var config = {
    podUrl: 'https://scs-pods.noggin.space',
    vendorUrl: 'https://scs-vendors.noggin.space',
    vendorId: '40B0C40C4872',
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
}

// initiate configuration
Nognog.init(config);
```
POD operations
```js
var vendorAccessToken = await Nognog.podConnect("hieutran@noggin.asia");
var activity = {
    "scope":"sites.history",
    "action": {
        "actionPredicate":"article1",
        "actionObject":"front_676"
        
    },
    "timestamp":1569983632000
}
var feedActResult = await Nognog.feedPodActivity(vendorAccessToken, activity);

var getRecPayload = {
                    	"recommendationType":"similar",
                    	"searchQuery":"certification and standards development",
                    	"currentViewItemId":"article_190790",
                    	"contentViewerGrp":"exco",
                    	"top-k": 10,
                    	"requestContentType": ["article","event"]
                    }
var getRecResult = await Nognog.getRecommendations(vendorAccessToken, getRecPayload);

var feedback = {
               	"scope":"sites.history",
               	"action": {
               		"actionPredicate":"article1",
               		"actionObject":"front_676"
               		
               	},
               	"timestamp":1569983632000
               }
var feedActivitiesResult = await Nognog.feedbackRecommendation(vendorAccessToken, feedback)

var activity = {
               	"scope":"sites.history",
               	"action": {
               		"actionPredicate":"why",
               		"actionObject":"front_676"
               		
               	},
               	"timestamp":1569983632000
               }
var feedActivitiesResult = await Nognog.feedPodActivity(vendorAccessToken, activity)
```

Incremental content uploading
```js
var contents = {
               	"payloads": [{
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
               	}],
               	"eventType":"article"
               }

var result = Nognog.uploadIncrementalContent(contents)
```
