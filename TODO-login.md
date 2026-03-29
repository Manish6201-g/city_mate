# Unified Login System Plan

## Information Gathered
- Current: Direct page access, admin.html separate
- Goal: login.html → role-based access (client/admin)

## Plan
1. **login.html** (new): Email/pw form → set role in localStorage → redirect
2. **script.js**: Auth check on all pages, role-based nav/content
3. **Update nav**: Client sees bookings, admin sees dashboard
4. **Protect pages**: Redirect to login if not authenticated

## Dependent Files
- New: login.html
- Edit: script.js, all *.html (add role checks)

## Followup
- Test flow: login → main → book → admin view
- `open login.html`

Ready to create login.html?

