# Page snapshot

```yaml
- generic [ref=e1]:
  - generic:
    - list
  - generic [ref=e10]:
    - generic [ref=e11]:
      - img "authentik Logo" [ref=e13]
      - generic [ref=e14]:
        - banner [ref=e15]:
          - heading "Swarajability Login" [level=1] [ref=e16]
        - generic [ref=e18]:
          - generic [ref=e20]:
            - generic [ref=e21]:
              - img "User's avatar" [ref=e22]
              - text: aadityap@byteridge.com
            - link "Not you?" [ref=e24] [cursor=pointer]:
              - /url: /flows/-/cancel/
          - generic [ref=e27]:
            - generic [ref=e28]:
              - generic [ref=e29]: Password
              - text: "*"
            - textbox "Please enter your password" [ref=e32]: aadityap@byteridge.com
          - link "Forgot password?" [ref=e33] [cursor=pointer]:
            - /url: https://auth-d.swarajability.org/if/flow/reset-password/
          - button "Continue" [ref=e35] [cursor=pointer]
        - contentinfo [ref=e36]:
          - list [ref=e37]
    - contentinfo [ref=e38]:
      - list [ref=e39]:
        - listitem [ref=e40]:
          - generic [ref=e41]: Powered by authentik
```