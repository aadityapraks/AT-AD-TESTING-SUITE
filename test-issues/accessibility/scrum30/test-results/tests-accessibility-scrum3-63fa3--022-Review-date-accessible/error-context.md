# Page snapshot

```yaml
- generic [ref=e1]:
  - generic:
    - list
  - generic [ref=e10]:
    - generic [ref=e11]:
      - generic [ref=e15]:
        - progressbar [ref=e18]
        - heading [level=1]
      - img "authentik Logo" [ref=e23]
      - generic [ref=e24]:
        - banner [ref=e25]:
          - heading "Swarajability Login" [level=1] [ref=e26]
        - generic [ref=e28]:
          - generic [ref=e30]:
            - generic [ref=e31]:
              - img "User's avatar" [ref=e32]
              - text: aadityap@byteridge.com
            - link "Not you?" [ref=e34] [cursor=pointer]:
              - /url: /flows/-/cancel/
          - generic [ref=e37]:
            - generic [ref=e38]:
              - generic [ref=e39]: Password
              - text: "*"
            - textbox "Please enter your password" [ref=e42]: aadityap@byteridge.com
          - link "Forgot password?" [ref=e43] [cursor=pointer]:
            - /url: https://auth-d.swarajability.org/if/flow/reset-password/
          - button "Continue" [ref=e45] [cursor=pointer]
        - contentinfo [ref=e46]:
          - list [ref=e47]
    - contentinfo [ref=e48]:
      - list [ref=e49]:
        - listitem [ref=e50]:
          - generic [ref=e51]: Powered by authentik
```